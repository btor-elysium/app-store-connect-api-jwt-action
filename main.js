const jwt = require('jsonwebtoken');
const core = require('@actions/core');


const issuerId = core.getInput("issuer_id");
const payload = {
    iss: issuerId,
    aud: 'appstoreconnect-v1',
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 20 * 60,
}

const key = core.getInput("key");
const keyId = core.getInput("key_id");
const signedToken = jwt.sign(
    payload,
    key, {
    algorithm: 'ES256',
    keyid: keyId
});

core.setOutput('token', signedToken);