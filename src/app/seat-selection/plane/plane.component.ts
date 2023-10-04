import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent {

  num_rows: number = 0;
  num_seats_per_row: number = 0;
  seats: boolean[][]  =[
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ];
  numSeats: any;
  message!: string;
  allocateSeatsValue!: [number, number][];

  constructor() {
    this.num_rows = 3;
    this.num_seats_per_row = 8;
    this.seats = Array.from(
      { length: this.num_rows },
      () => new Array(this.num_seats_per_row).fill(false)
    );
  }

  allocateSeats(num_seats: any): [number, number][] | null {
    for (let row = 0; row < this.num_rows; row++) {
      if (num_seats === 4) {
        const startSeat = this.findEmptyMiddleSeats(row, num_seats);
        if (startSeat !== null) {
          return this.markSeatsAsAllocated(row, startSeat, num_seats);
        } else {
          this.message = 'Sorry, there are no available seats for your request.';
        }
      } else if (num_seats === 3) {
        const startSeat = this.findEmptyMiddleSeats(row, num_seats);
        if (startSeat !== null) {
          return this.markSeatsAsAllocated(row, startSeat, num_seats);
        }else {
          this.message = 'Sorry, there are no available seats for your request.';
        }
      } else if (num_seats === 2) {
        const startSeat = this.findEmptyEdgeSeats(row, num_seats);
        if (startSeat !== null) {
          return this.markSeatsAsAllocated(row, startSeat, num_seats);
        }else {
          this.message = 'Sorry, there are no available seats for your request.';
        }
      } else if (num_seats === 1) {
        const startSeat = this.findEmptyEdgeSeats(row, num_seats);
        if (startSeat !== null) {
          return this.markSeatsAsAllocated(row, startSeat, num_seats);
        }else {
          this.message = 'Sorry, there are no available seats for your request.';
        }
      } else {
          this.message = 'Sorry, there are no available seats for your request.';
        }
    }
    return null;
  }

  findEmptyMiddleSeats(row: number, num_seats: number): number | null {
    for (let startSeat = 0; startSeat < this.num_seats_per_row - num_seats + 1; startSeat++) {
      const isMiddleSectionEmpty =
        this.seats[row][startSeat + 1] === false &&
        this.seats[row][startSeat + 2] === false &&
        this.seats[row][startSeat + 3] === false &&
        this.seats[row][startSeat + 4] === false;
      if (isMiddleSectionEmpty) {
        if (startSeat <= 2 || startSeat >= 5) {
          return startSeat;
        }
      }
    }
    return null;
  }

  findEmptyEdgeSeats(row: number, num_seats: number): number | null {
    for (let startSeat = 0; startSeat < this.num_seats_per_row - num_seats + 1; startSeat++) {
      const isEmpty =
        this.seats[row][startSeat] === false &&
        (num_seats === 1 || this.seats[row][startSeat + 1] === false);
      if (isEmpty) {
        return startSeat;
      }
    }
    return null;
  }

  markSeatsAsAllocated(row: number, startSeat: number, num_seats: number): [number, number][] {
    const allocatedSeats: [number, number][] = [];
    for (let i = 0; i < num_seats; i++) {
      this.seats[row][startSeat + i] = true;
      allocatedSeats.push([row, startSeat + i]);
      this.allocateSeatsValue = allocatedSeats;
      console.log(this.allocateSeatsValue);
    }
    return allocatedSeats;
  }



  

}
