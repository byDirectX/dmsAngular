import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(documents, searchString: string, typeSearch: number) {

    if (!Array.isArray(documents)) {
      return;
    }

    switch (typeSearch) {
      case 1: {
        console.log('filter by name');
        return documents.filter(document => {
          return document.fileName.includes(searchString);
        });
      }

      case 2: {
        console.log('filter by author');
        return documents.filter(document => {
          if (document.fileAuthor === null) {

          } else {
            return document.fileAuthor.includes(searchString);
          }
        });
      }

      case 3: {
        console.log('filter by typedoc');
        return documents.filter(document => {
          return document.typeDoc === parseInt(searchString);
        });
      }

      case 4: {
        console.log('filter by ext');
        return documents.filter(document => {
          return document.ext.includes(searchString);
        });
      }
    }
  }
}
