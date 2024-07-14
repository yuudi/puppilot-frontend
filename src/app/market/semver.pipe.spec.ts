import { SemverPipe } from './semver.pipe';

describe('SemverPipe', () => {
  it('create an instance', () => {
    const pipe = new SemverPipe();
    expect(pipe).toBeTruthy();
  });
});
