import { Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'FilterName'
})
// ProdName
export class FilterProductName implements PipeTransform{
    
    transform(products:any,searchByName:any):any{
        if(searchByName===undefined){
            return products;
        }else{
            return products.filter(
                function(x){
                        return x.ProdName.toLowerCase()
                        .includes(searchByName.toLowerCase())
            })
        }
    }
}