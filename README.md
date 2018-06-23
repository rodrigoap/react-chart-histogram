# react-chart-histogram

### Install

```
yarn add react-chart-histogram
```

### Usage

```javascript
import Histogram from 'react-chart-histogram';
...
render() {
  const labels = ['2016', '2017', '2018'];
  const data = [324, 45, 672];
  return (
    <div>
      <Histogram xLabels={labels} yValues={data} />
    </div>
  )
}
```

[See it in action!](https://www.rodrigoap.com/tapas "See it in action")
