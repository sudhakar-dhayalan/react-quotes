import { useEffect } from "react";
import { Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const DUMMY_QUOTES = [
  { id: "q1", author: "Author One", text: "Some text from author One" },
  {
    id: "q2",
    author: "Author Two",
    text: "Some writings / text from author Two",
  },
];

const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">Something went wrong</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found.</p>;
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
