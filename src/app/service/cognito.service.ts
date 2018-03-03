import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable()
export class CognitoService {
    private region = environment.awsRegion;
    private poolId = environment.cognitoUserPoolId;
    private clientId = environment.cognitoClientId;
    private pool = {
        UserPoolId: this.poolId,
        ClientId: this.clientId
    };

    constructor() { }

    getUserPool(): CognitoUserPool {
        return new CognitoUserPool(this.pool);
    }

    getCurrentUser(): CognitoUser {
        return this.getUserPool().getCurrentUser();
    }

}
