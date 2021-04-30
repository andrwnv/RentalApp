import crypto from 'crypto';

export const generateMD5 = (val: string): string => {
    return crypto.createHash('md5').update(val).digest('hex') ;
};
