import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,

    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        AlertComponent,
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
    ]
})
export class SharedModule { }