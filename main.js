const jwt = require('jsonwebtoken');
const core = require('@actions/core');

const issuerId = core.getInput("issuer_id");
const payload = {
    iss: issuerId,
    aud: 'appstoreconnect-v1',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 20 * 60,
}

const base64EncodedKey = core.getInput("base64_encoded_key");
const key = Buffer.from(base64EncodedKey, "base64").toString();

const keyId = core.getInput("key_id");
const signedToken = jwt.sign(
    payload,
    key, {
    algorithm: 'ES256',
    keyid: keyId
});

core.setOutput('token', signedToken);