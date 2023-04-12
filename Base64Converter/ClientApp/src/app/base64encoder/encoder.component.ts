import { Component,Inject } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-encouder-component',
  templateUrl: './encoder.component.html'
})

export class EncoderComponent {

  title = 'SignalRClient';
  private hubConnectionBuilder!: HubConnection;
  textInput:string = ""
  result: string = "";
  status: string = ""

 

  
  constructor(private http: HttpClient) {}

  send() {
    // this.http.post('http://localhost:44459/encoder/encodetext', this.textInput).subscribe((response) => {
    //   this.status =  response.toString()
    // });

    
    this.http.post(
      'http://localhost:44455/encoder/encodetext/', {Text: "Leomax"},
      { headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
      }).subscribe((response) => {
        this.status =  response.toString()
      });
  }


  ngOnInit(): void {
    console.log("On Init");



    let accessToken = "3076a225-f2f6-4c68-b894-08accb62bb90";




    try {
      this.hubConnectionBuilder = new HubConnectionBuilder()
        .withUrl('http://localhost:44455/encoderhub', { accessTokenFactory: () => accessToken } )
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server'));
      
    this.hubConnectionBuilder.on('SendDecodedText', (result: any) => {
      console.log("Result:",result)
      this.result = this.result.concat(this.result,result)
    });
    } catch (error) {
      console.log("ERROR")
    }

   
}



}

