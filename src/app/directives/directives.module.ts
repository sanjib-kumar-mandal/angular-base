import { NgModule } from "@angular/core";
import { CopyDirective } from "./copy/copy.directive";
import { ResizedDirective } from './resized/resized.directive';
import { AnchorTagsDirective } from './anchor-tags/anchor-tags.directive';

@NgModule({
    declarations: [
        CopyDirective,
        ResizedDirective,
        AnchorTagsDirective
    ],
    imports: [],
    exports: [
        CopyDirective,
        ResizedDirective,
        AnchorTagsDirective
    ]
})

export class DirectivesModule {}