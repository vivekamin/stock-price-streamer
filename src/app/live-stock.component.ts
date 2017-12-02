import { Component, OnInit } from '@angular/core';
import {liveStockService} from './service/live-stock.service'
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'live-stock',
  templateUrl: 'live-stock.component.html',
  providers:[liveStockService]
})
export class liveStockComponent implements OnInit {
  public barChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true
   };
   public barChartLabels:string[] = [];
   public barChartType:string = 'bar';
   public barChartLegend:boolean = true;

   public barChartData:any[] = [
     {data: [], label: 'Price'},
     //{data: [28, 48, 40, 19], label: 'Series B'}
   ];
  name1:string
  timer:any
  price:number
  ListOfStock = []
  Price = {}
  flag:any
  //string1 = ""

  constructor(private liveStockService: liveStockService) {
    //this.name1= "Live Stock App"
   }

  ngOnInit() {

  }

  startGetting(){
    let timer1 = Observable.timer(1,2000)


    this.timer = timer1.subscribe( tick =>{
        let string1 = ""
        for (let item in this.ListOfStock){
          string1 = string1+this.ListOfStock[item]+','
        }
         let clone = JSON.parse(JSON.stringify(this.barChartData));
          clone[0].data = []
          let temp:string[] = [];
          //this.barChartLabels = []
        this.liveStockService.getStockPrice(string1)
                             .subscribe((res)=>{
                               console.log(res)
                               //console.log(res['GOOGL'].quote.latestPrice)
                               //this.price = res['GOOGL'].quote.latestPrice
                               for (let item in this.ListOfStock){
                                 if(res[this.ListOfStock[item]]){
                                 console.log(res[this.ListOfStock[item]].quote.latestPrice)
                                 this.Price[this.ListOfStock[item]]=(res[this.ListOfStock[item]].quote.latestPrice)
                                 console.log(this.Price)

                                 //clone[0].data = data;
                                 //console.log(c)

                                 clone[0].data.push(this.Price[this.ListOfStock[item]])
                                 temp.push(this.ListOfStock[item])
                                 this.flag = Object.keys(this.Price).length


                                 //this.barChartLabels.push('2014')

                               }
                               else{
                                 console.log(this.ListOfStock[item] + 'is invalid stock name. Removing it from list')
                                 this.ListOfStock.splice(parseInt(item), 1);
                                 alert("No such stock available")
                                 console.log(Object.keys(this.Price).length)
                                 this.flag = Object.keys(this.Price).length
                               }
                               }
                              //this.barChartData = clone;
                               if(JSON.stringify(this.barChartLabels)==JSON.stringify(temp)){
                                 this.barChartData = clone;
                               }
                               else{
                               this.barChartLabels = temp
                               //this.barChartData = clone;
                               console.log(this.barChartLabels)
                               setTimeout(() => {
                                 this.barChartData = clone;
                               }, 0);
                               }



                             },
                             (error)=>{
                                //this.barChartLabels = this.ListOfStock
                                console.log(error)
                                this.timer.unsubscribe()
                             })


    })
  }

  stopGetting(){
    this.timer.unsubscribe()
  }
  onSubmit(){
    //alert("Clicked")
    let x = this.name1.toUpperCase()
    if(this.ListOfStock.includes(x)){
      alert("Already Added")
    }
    else{

      this.ListOfStock.push(x)
      if(this.ListOfStock.length == 1){
        this.startGetting()
      }
      else{
        this.timer.unsubscribe()
        this.startGetting()

      }
    }

  }

  removeThisStock(stockIndex){
    let name = this.ListOfStock[stockIndex]
    delete this.Price[name];
    this.ListOfStock.splice(stockIndex, 1);
    this.flag = Object.keys(this.Price).length


  }


 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }



}
