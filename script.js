var myGame = new WizardOrpheus('', `
You are a lost adventurer. You are trying to find your way home. But, in the dark forest, you find a wooden house with a stone watchtower. It looks like someone lived there. It had a tiny farm nearby, to grow crops for food, some empty animal pens. In the back, there is a barn and what needed to look like 2 horse stalls. Altough it looked like the house was haunted, the lanterns on the raod from the house to the barn were lit, like the ones in the house and the stalls. You open the door and enter the house. Your goal is to find out what happened there, as there was no living person or animal around.
`)

myGame.createUserAction({
  // This is the name of the action that you will later use. Ex. myGame.message("hi!")
  name: 'message',
  // This is a description, in order, of each parameter that myGame.message() takes. There can be multiple.
  parameters: ['Message from user to game'],
  // A sentence description of what the bot should do in response to the user's action.
  howBotShouldHandle: 'Respond to the user'
})

myGame.variable('score', 'Current score. Changes (positive and negatively) as the user does things.', 0)
myGame.variable('scaredLevel', 'How scared the user is. This changes quickly. From 0 (not scared) to 50 (very scared).', 0)

// When the user enters a message and presses enter
document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code == 'Enter') { // if the user presses enter
    let userInput = document.getElementById('input').value
    myGame.message(userInput)

    // Add the user's message to the conversation
    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>'

    // Clear the input field
    document.getElementById('input').value = ''
  }
})

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'

  document.getElementById('score').innerHTML = data.currentVariables.score.value

  // Set the background color to how scared the user is. You can look up other rgba values and change the first three 0s to change the color.
  document.body.style.backgroundColor = `rgba(0, 0, 0, ${data.currentVariables.scaredLevel.value / 50})`
})
