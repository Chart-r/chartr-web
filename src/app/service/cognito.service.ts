import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

/** Class representing the cognito service */
@Injectable()
export class CognitoService {
    /** The AWS region */
    private region = environment.awsRegion;
    /** The cognito pool id */
    private poolId = environment.cognitoUserPoolId;
    /** The cognito client id */
    private clientId = environment.cognitoClientId;
    /** The cognito pool */
    private pool = {
        UserPoolId: this.poolId,
        ClientId: this.clientId
    };

    /** Create a cognito service */
    constructor() { }

    /** Get the cognito user pool */
    getUserPool(): CognitoUserPool {
        return new CognitoUserPool(this.pool);
    }

    /** Get the current cognito user */
    getCurrentUser(): CognitoUser {
        return this.getUserPool().getCurrentUser();
    }

}
