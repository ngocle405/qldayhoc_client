import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AppService {

    constructor(
        private router: Router,
    ) {

    }

    buildMenu(menu: any[]): any {
        const result: any = [];
        menu.forEach((m: any) => {
            if (m.children) {
                const sub = this.buildMenu(m.children);
                if (sub.length) {
                    m.children = sub;
                    result.push(m);
                }
            }
        });
        return result;
    }
}