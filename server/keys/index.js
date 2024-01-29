import fs from 'fs'

// RS256 algorithm key pairs
const PRIVATE_KEY = fs.readFileSync(`./server/keys/private_key.pem`, {
	encoding: 'utf8',
})

// Public Key: A key derived from the private key, meant for distribution. It's used to verify digital signatures and encrypt data that only the private key holder can decrypt.
// used to verify Json web tokens
const PUBLIC_KEY = fs.readFileSync(`./server/keys/public_key.pem`, {
	encoding: 'utf8',
})
export { PRIVATE_KEY, PUBLIC_KEY }
