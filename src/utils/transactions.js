import axios from 'axios';
import { contract as state } from '../contract';

const transactions = {
    add: async (chain, hash, res) => {
        const list = transactions.get();
        if(!list[chain]) {
            list[chain] = {};
        }
        res.timestamp = new Date().getTime();
        list[chain][hash] = res;
        window.localStorage.setItem('transactions', JSON.stringify(list));
        const {
            inToken,
            outToken,
            inAmount,
            outAmount,
        } = res;
        if (chain === 'bsc' && (window.ethereum.isCoin98 || window.coin98)) {
            await axios.post('/v1/ubt/submit', {
                chain: 'bsc',
                account: state.default_account,
                wallet: 'coin98',
                tx: hash,
                inToken,
                outToken,
                inAmount,
                outAmount,
                platform: 'pc'
            });
        }
    },
    del: (chain, hash) => {
        const list = transactions.get();
        if(!list[chain]) {
            return;
        }
        delete list[chain][hash];
        window.localStorage.setItem('transactions', JSON.stringify(list));
    },
    get: () => {
        const list = window.localStorage.getItem('transactions');
        return list && JSON.parse(list) || {};
    }
}

export default transactions;
