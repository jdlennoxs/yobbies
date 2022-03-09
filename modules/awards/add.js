import { gql, useMutation } from "@apollo/client";

const CREATE_AWARD = gql`
  mutation CreateAwards($input: [AwardCreateInput!]!) {
    createAwards(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;
export default function AddAward() {
  const [addAward, { data: nodesCreated, loading: posting, error: failed }] =
    useMutation(CREATE_AWARD);

  const save = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    const input = {
      name: event.target.name.value,
      description: event.target.description.value,
      type: event.target.type.value,
    };
    addAward({ variables: { input } });
  };

  return (
    <>
      {nodesCreated && (
        <div className="content">
          <h1 className="has-text-success">Success</h1>
        </div>
      )}

      <div className="container p-3 my-6 ">
        <div className="content">
          <h1 className="has-text-white">Add Award</h1>
        </div>
        <form onSubmit={save}>
          <div className="field">
            <label className="label" htmlFor="Name">
              Name
            </label>
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="Description">
              Description
            </label>
            <input
              className="input"
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="Type">
              Type
            </label>
            <div className="select">
              <select id="type">
                <option value="yob">Yob</option>
                <option value="film">Film</option>
              </select>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
