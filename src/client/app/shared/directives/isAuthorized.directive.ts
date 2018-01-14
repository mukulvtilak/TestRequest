import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Import to the root module for this to work
 */
@Directive({ selector: '[userIsAuth]' })
export class IsAuthorizedDirective {
    @Input('userIsAuth') conditionArray: any;
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {

    }

    ngOnInit () {
        // TODO: Remove after permissions api is available
        localStorage.setItem('UserPermissions','["ABOUTDATE.VIEW","HOMELIST.VIEW","SOMETHING.REQUIRED"]');
        let usrHasPermissions = JSON.parse(localStorage.getItem('UserPermissions'));
        let visible: boolean = false;
        if(this.conditionArray.length > 0)
        this.conditionArray.forEach((element:any) => {
            visible = usrHasPermissions.includes(element);
        });

        visible ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
    }
}
