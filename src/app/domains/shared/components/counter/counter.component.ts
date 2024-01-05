import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);

  counterRef: number | undefined;

  constructor() {
    // No es Async.
    // Antes del render.
    // Una Vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Antes del render y durante.
    console.log("ngOnChange");
    console.log('-'.repeat(10));
    console.log(changes);

    const duration = changes['duration'];
    if (duration) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // despues del render.
    // una vez
    // Async.
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration = ' , this.duration);
    console.log('message = ' , this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval')
      this.counter.update(statePrev => statePrev +1);
    }, 1000);
  }

  ngAfterViewInit() {
    // despues del render
    // hijos ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // Cuando el componente se destruye
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('change duration');
    // async

  }


}
