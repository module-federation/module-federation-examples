import { useState, useEffect, useCallback, useRef } from 'react';

const useFetchJson = (path, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 5000,
    validateData = null,
    fallbackData = null,
  } = options;

  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);
  const fetchStartedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!path) {
      console.warn('useFetchJson: path is required');
      setIsLoading(false);
      return;
    }

    // Skip if fetch is already in progress
    if (fetchStartedRef.current) {
      return;
    }

    // Mark fetch as started
    fetchStartedRef.current = true;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsLoading(true);
    setError(null);

    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Fetching JSON from ${path} (attempt ${attempt}/${maxRetries})`);

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Request timeout after ${timeout}ms`)), timeout),
        );

        // Create fetch promise
        const fetchPromise = fetch(path, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
          signal,
        });

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (signal.aborted || !isMountedRef.current) {
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('Response is not JSON, attempting to parse anyway');
        }

        const json = await response.json();

        // Validate data if validator provided
        if (validateData && !validateData(json)) {
          throw new Error('Data validation failed');
        }

        if (!isMountedRef.current) {
          return;
        }

        console.log(`Successfully fetched JSON from ${path}`);
        setData(json);
        setRetryCount(0);
        setIsLoading(false);
        fetchStartedRef.current = false; // Reset for potential retries
        return;
      } catch (err) {
        lastError = err;

        if (signal.aborted || !isMountedRef.current) {
          return;
        }

        console.warn(`Failed to fetch JSON (attempt ${attempt}/${maxRetries}):`, err.message);

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }
      }
    }

    // All retries failed
    if (!signal.aborted && isMountedRef.current) {
      console.error(`Failed to fetch JSON from ${path} after ${maxRetries} attempts:`, lastError);
      setError(lastError);
      setRetryCount(maxRetries);

      // Use fallback data if provided
      if (fallbackData !== null) {
        console.log('Using fallback data');
        setData(fallbackData);
      }

      setIsLoading(false);
      fetchStartedRef.current = false; // Reset for potential retries
    }
  }, [path, maxRetries, retryDelay, timeout, validateData, fallbackData]);

  const retry = useCallback(() => {
    setError(null);
    setRetryCount(0);
    fetchStartedRef.current = false; // Allow refetch on retry
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Component may mount twice in React 18 strict mode. Ensure the ref is
    // reset so subsequent fetches can update state correctly.
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      fetchStartedRef.current = false; // Reset fetch flag on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    retry,
    retryCount,
  };
};

export default useFetchJson;
