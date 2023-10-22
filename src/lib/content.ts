// API
const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/content`;

const fetchContent = async () => {
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data.content;
};

const parseContentIntoSentences = (ssml: string): Array<string> => {
  const regex = /<s>(.*?)<\/s>/g;
  const matches = ssml.match(regex);
  if (!matches) return [];
  const sentences = matches.map((match) => match.replace(/<\/?s>/g, ""));
  return sentences;
};

export { fetchContent, parseContentIntoSentences };
