import { Router } from "@angular/router";

export class CheckStatusCode
{
    constructor(private router: Router) {}

    ErrorResponse(status: number): boolean
    {
        switch(status)
        {
            case 401:
                this.router.navigate(['error/401']);
                break;
            case 403:
                this.router.navigate(['error/403']);
                break;
            case 404:
                this.router.navigate(['error/404']);
                break;
        }
        return status == 401 || status == 403 || status == 404;
    }
}