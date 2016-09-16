/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import InsertAuthorForm from 'components/InsertAuthorForm'

const MyQuery = gql`query MyQuery
  {
    authors {
      id
      firstName
      lastName
    }
  }
`;


@graphql(MyQuery)
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      authors: PropTypes.array,
    }),
  }
  render() {
    const {
      data: {
        loading,
        authors = [],
      },
    } = this.props;

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {loading ?
          <div>Loading...</div>
          :
          <ul>
            {authors.map(author => <li key={author.id}>{author.id} - {author.firstName} {author.lastName}</li>)}
          </ul>
        }
        <InsertAuthorForm />
      </div>
    );
  }
}
