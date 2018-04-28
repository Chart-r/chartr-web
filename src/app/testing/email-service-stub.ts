export class EmailServiceStub {
    sendMail(options: Object, cb: (err: string, res: string) => void): void {
        cb(null, 'OK');
    }
}
