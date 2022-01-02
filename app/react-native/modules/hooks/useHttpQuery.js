import { useState, useEffect } from 'react';
import httpQuery from 'vibe/modules/httpQuery';

const NETWORK_FAILED_FR = 'Erreur lors de la requête au serveur';

const useHttpQuery = ({ url, trigger, onSuccess, onFailure, method = 'GET', body, params }) => {
  const [state, setState] = useState({ loading: !trigger, success: false, error: false });
  const executeRequest = async ({ body: triggerBody, params: triggerParams } = {}) => {
    setState((state) => ({ ...state, loading: true }));
    httpQuery({ url, method, body: triggerBody || body, params: triggerParams || params })
      .then((response) => {
        setState({ ...response, success: true, loading: false, error: false });
        if (onSuccess) onSuccess(response);
      })
      .catch((error) => {
        const message = error.message === 'Network request failed' ? NETWORK_FAILED_FR : error.message;
        setState({ message, loading: false, success: false, error: true });
        if (onFailure) onFailure(message);
      });
  };

  useEffect(() => {
    if (!trigger) executeRequest();
  }, [url]);

  if (!trigger) return state;
  return { ...state, triggerQuery: executeRequest };
};

export default useHttpQuery;
