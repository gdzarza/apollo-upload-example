import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import uploadsQuery from '../queries/uploads'

const UploadFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) =>
    validity.valid &&
    mutate({
      variables: { file },
      update(
        proxy,
        {
          data: { singleUpload }
        }
      ) {
        const data = proxy.readQuery({ query: uploadsQuery })
        data.uploads.push(singleUpload)
        proxy.writeQuery({ query: uploadsQuery, data })
      }
    })

  return <input type="file" required onChange={handleChange} />
}


export default graphql(gql`
  mutation($file: Upload!) {
    updateInfluencer(
      id: "cjlxze31q00170c61zk7ol0mk"
      username: "Influencer 1 - Test - 2"
      cognitoId: "123"
      biography: "A new biography"
      facebook: "www.facebook.com"
      file: $file) {
        id
        username
        profileImageURL
      }
  }
`)(UploadFile)

/*
export default graphql(gql`
  mutation($file: Upload!) {
    createPost(
      products: ["cjm0yiaz5006f0a67ef2bgvkv"]
      influencerId: "cjm0zl13000dh0a67rl9i5h4f"
      title: "some title w photo 3"
      file: $file) {
        id
        title
        imageURL
      }
  }
`)(UploadFile)
*/