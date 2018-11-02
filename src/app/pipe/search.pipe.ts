import { Pipe, PipeTransform } from '@angular/core';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(documents, searchString: any, typeSearch: number) {

      if (!Array.isArray(documents)) {
        return;
      }

        switch (typeSearch) {
            case 1: {
              return documents.filter(document => {
                return document.fileName.includes(searchString);
              });
            }

            case 2: {
              return documents.filter(document => {
                if (document.fileAuthor === null) {

                } else {
                  return document.fileAuthor.indexOf(searchString);
                }
              });
            }

            case 3: {
              return documents.filter(document => {
                return document.typeDoc === parseInt(searchString);
              });
            }

            case 4: {
              return documents.filter(document => {
                return document.ext.indexOf(searchString);
              });
            }
        }
    }
}
