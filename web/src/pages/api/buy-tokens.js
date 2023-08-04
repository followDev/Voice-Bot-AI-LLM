import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { api } from 'utils/api';

export default (async (req, res) => {
    try {
        const { accessToken } = await getAccessToken(req, res, {
            scopes: ['openid']
        });

        console.log(accessToken)

        const response = await axios.post(api('buy-tokens'), {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }).then((res) => {
                return res
            }).catch((err) => {
                console.log('err', err);
                return err
            });

        console.log(response)

        res.status(response.status || 200).json(response.data);
    } catch (errorWrapped) {
        const error = errorWrapped;
        console.error(error);
        res.status(error.status || 400).json({
            code: error.code,
            error: error.message
        });
    }
});