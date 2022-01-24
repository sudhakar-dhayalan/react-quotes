import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuotesList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const DUMMY_QUOTES = [
  { id: "q1", author: "Author One", text: "Some text from author One" },
  {
    id: "q2",
    author: "Author Two",
    text: "Some writings / text from author Two",
  },
];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: quotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p className="centerd focused">{error}</p>;
  }

  if (status === "completed" && (!quotes || quotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuotesList quotes={quotes} />;
};

export default AllQuotes;
