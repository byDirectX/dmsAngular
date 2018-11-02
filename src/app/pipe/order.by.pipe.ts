import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(documents, order, asc = true) {

      if (!Array.isArray(documents)) {
        return;
      }

        switch (order) {
            case 1: {
                order = 'fileName';
                break;
            }

            case 2: {
                order = 'dateUploading';
                break;
            }
        }

        if (!order || order.trim() === '') {
            return documents;
        }

        if (asc) {
            return Array.from(documents).sort((item1: any, item2: any) => {
                return this.orderByComparator(item1[order], item2[order]);
            });
        } else {
            return Array.from(documents).sort((item1: any, item2: any) => {
                return this.orderByComparator(item2[order], item1[order]);
            });
        }
    }

    orderByComparator(a: any, b: any): number {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            if (a.toLowerCase() < b.toLowerCase()) { return -1; }
            if (a.toLowerCase() > b.toLowerCase()) { return 1; }
        } else {
            if (parseFloat(a) < parseFloat(b)) { return -1; }
            if (parseFloat(a) > parseFloat(b)) { return 1; }
        }

        return 0;
    }

}
