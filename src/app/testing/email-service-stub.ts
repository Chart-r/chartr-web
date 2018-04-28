/** The fake email service used in testing */
export class EmailServiceStub {
    /**
     * Send confirmation email to users
     * @param body The reqeust body to send
     * @param cb The callback to call when the "request" finishes
     */
    sendMail(body: Object, cb: (err: string, res: string) => void): void {
        cb(null, 'OK');
    }
}
