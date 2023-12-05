-- main.lua

-- Constants
local screenWidth = 800
local screenHeight = 600

-- Farmer properties
local farmer = {
    x = 100,
    y = screenHeight - 50,
    width = 50,
    height = 50,
    speed = 200,
    isJumping = false,
    jumpHeight = 300,
    jumpDuration = 0.5, -- in seconds
    lives = 3,
}

-- Boxes properties
local boxes = {} -- Table to store multiple box objects
local boxWidth = 50
local boxHeight = 50
local boxSpeed = 100

-- Scoring
local score = 0
local scoreThreshold = 3

-- Load assets and set up the game
function love.load()
    love.window.setTitle("Farmers and Boxes Game")
    love.window.setMode(screenWidth, screenHeight, {resizable=true})
end

-- Update function
function love.update(dt)
    -- Move farmer
    if love.keyboard.isDown("left") then
        farmer.x = farmer.x - farmer.speed * dt
    elseif love.keyboard.isDown("right") then
        farmer.x = farmer.x + farmer.speed * dt
    end

    -- Jumping logic
    if love.keyboard.isDown("space") and not farmer.isJumping then
        farmer.isJumping = true
        farmer.jumpStartY = farmer.y
        farmer.jumpTimer = 0
    end

    if farmer.isJumping then
        farmer.jumpTimer = farmer.jumpTimer + dt
        farmer.y = farmer.jumpStartY - 0.5 * 1000 * (farmer.jumpTimer^2 - farmer.jumpDuration * farmer.jumpTimer)
        if farmer.jumpTimer >= farmer.jumpDuration then
            farmer.isJumping = false
            farmer.y = screenHeight - farmer.height
        end
    end

    -- Update boxes
    for _, box in ipairs(boxes) do
        box.y = box.y + boxSpeed * dt

        -- Check for collision with the farmer
        if CheckCollision(farmer, box) then
            farmer.lives = farmer.lives - 1
            ResetGame()
            if farmer.lives <= 0 then
                love.event.quit() -- Game over when lives are used up
            end
        end
    end

    -- Randomly drop boxes from the top
    if math.random() < 0.01 then
        local newBox = {
            x = math.random(screenWidth - boxWidth),
            y = -boxHeight,
            width = boxWidth,
            height = boxHeight,
        }
        table.insert(boxes, newBox)
    end

    -- Check for scoring conditions
    for i = #boxes, 1, -1 do
        for j = i - 1, 1, -1 do
            if CheckCollision(boxes[i], boxes[j]) then
                for k = j, 1, -1 do
                    table.remove(boxes, k)
                end
                score = score + 1
            end
        end
    end
end

-- Draw function
function love.draw()
    -- Draw farmer
    love.graphics.rectangle("fill", farmer.x, farmer.y, farmer.width, farmer.height)

    -- Draw boxes
    for _, box in ipairs(boxes) do
        love.graphics.rectangle("fill", box.x, box.y, box.width, box.height)
    end

    -- Draw score
    love.graphics.print("Score: " .. score, 10, 10)

    -- Draw lives
    love.graphics.print("Lives: " .. farmer.lives, 10, 30)
end

-- Collision detection function
function CheckCollision(a, b)
    return a.x < b.x + b.width and
           a.x + a.width > b.x and
           a.y < b.y + b.height and
           a.y + a.height > b.y
end

-- Reset the game
function ResetGame()
    farmer.x = 100
    farmer.y = screenHeight - 50
    boxes = {}
end


