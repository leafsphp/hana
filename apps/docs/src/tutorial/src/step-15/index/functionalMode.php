<!DOCTYPE html>
<html>

<head>
  <title>Congratulations!</title>

  <script src="https://unpkg.com/vue@3"></script>
  <script type="text/javascript" src="https://agezao.github.io/confetti-js/dist/index.min.js"></script>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <h1>🎉 Congratulations!</h1>
  <canvas id="confetti-holder"></canvas>

  <script>
    var confettiSettings = {
      target: "confetti-holder"
    };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  </script>
</body>

</html>
