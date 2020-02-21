import {BehaviorSubject, Subject} from 'rxjs';

export class LoadableData<T> {
  public loading = true;
  public data: T;
  subject: BehaviorSubject<T>;

  public constructor(initial: Partial<T>, private loader: (() => Promise<T>), autoLoad= true) {
    this.data = initial as T;
    this.subject = new BehaviorSubject<T>(this.data);
    if (autoLoad) { this.reload(); }
  }

  public reload() {
    this.loading = true;
    this.loader().then(v => {
      this.data = v;
      this.next();
    });
  }

  public next() {
    this.loading = false;
    this.subject.next(this.data);
  }

  public wait(needNew: boolean = false): Promise<T> {
    if (!needNew && !this.loading) {return Promise.resolve(this.data); }
    return this.subject.toPromise();
  }
}
