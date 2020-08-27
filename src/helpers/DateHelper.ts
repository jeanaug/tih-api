export default abstract class DateHelper{

    static toString(date:Date){
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    static toDate(text:String){

        const date= text.split('/').reverse().map((item:any, indice) => item - indice % 2).join('-');
        return new Date(date);
        
        
    }

 
}