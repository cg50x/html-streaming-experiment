import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { stream } from 'hono/streaming'

const app = new Hono()

app.get('/', (c) => {
  return stream(c, async (stream) => {
    c.res.headers.set('Content-Type', 'text/html');
    await stream.write(`
      <h1>Weather App</h1>
      <p>Disclaimer: This is a demo app. The weather may not be accurate.</p>
      <p>Status: <span id="status">Getting out of bed...</span></p>
      <h2>Weather in Tokyo</h1>
      <div id="tokyo-weather">Loading...</div>
      <h2>Weather in Los Angeles</h1>
      <div id="los-angeles-weather">Loading...</div>
      <h2>Weather in Seattle</h1>
      <div id="seattle-weather">Loading...</div>
    `);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await stream.write(`
        <script>document.getElementById('status').textContent = 'Looking up at the weather from my Tokyo apartment...';</script>
    `);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await stream.write(`
      <script>
        document.getElementById('status').textContent = 'Looking up at the weather from my Tokyo apartment...';
      </script>
    `);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await stream.write(`
      <script>
        document.getElementById('tokyo-weather').textContent = '30 degrees and warm';
        document.getElementById('status').textContent = 'Getting on a flight to Seattle...';
      </script>
  `);
  await new Promise(resolve => setTimeout(resolve, 5000));
    await stream.write(`
      <script>
        document.getElementById('status').textContent = 'Arriving in SEATAC...';
      </script>
    `);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await stream.write(`
      <script>
      document.getElementById('seattle-weather').textContent = '15 degrees and rainy';
      document.getElementById('status').textContent = 'Getting on a flight to Los Angeles...';
      </script>
      `);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await stream.write(`
        <script>    
        document.getElementById('status').textContent = 'Arriving in LAX...';
        </script>
        `);
        await new Promise(resolve => setTimeout(resolve, 5000));
        await stream.write(`
          <script>
          document.getElementById('los-angeles-weather').textContent = '25 degrees and sunny';
        document.getElementById('status').textContent = 'Finished checking the weather! ';
      </script>
    `);
  });
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
