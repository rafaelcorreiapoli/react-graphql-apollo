import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import update from 'react-addons-update';

const insertAuthor = gql`
  mutation insertAuthor($firstName: String!, $lastName: String!) {
    insertAuthor(firstName: $firstName, lastName: $lastName) {
      id,
      firstName,
      lastName
    }
  }
`;

@graphql(insertAuthor, {
  props: ({ mutate }) => ({
    onSubmit: ({ firstName, lastName }) => mutate({
      variables: { firstName, lastName },
      optimisticResponse: {
        __typename: 'Mutation',
        insertAuthor: {
          __typename: 'Author',
          id: null,
          firstName,
          lastName,
        },
      },
      updateQueries: {
        MyQuery: (previousResult, { mutationResult }) => {
          const newAuthor = mutationResult.data.insertAuthor;
          return update(previousResult, {
            authors: {
              $unshift: [newAuthor],
            },
          });
        },
      },
    }),
  }),
})
class InsertAuthorForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      values: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;

    this.setState({
      values: {
        ...this.state.values,
        [field]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      onSubmit,
    } = this.props;

    onSubmit(this.state.values);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="firstName" onChange={this.handleChange} />
        <input type="text" name="lastName" onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default InsertAuthorForm;
