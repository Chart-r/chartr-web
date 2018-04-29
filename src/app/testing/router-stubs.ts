/** The fake Angular router used in testing */
export class RouterStub {
    /**
     * Navigate to a given url
     * @param url The url to navigate to
     */
    navigateByUrl(url: string): string { return url; }
}
