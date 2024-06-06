import pygame
from map_generation_load import *
from PLAYER import player, save_zone
from item_data import *
import time
from key_write import *
import numpy as np
from gestion_inv import *
from pygame.locals import *
from crafting_patern import *

chunkYLenght = 150
chunkXLenght = 10
withScreen = 500
cubeSize = 25
playerMiddleX = 212
playerSpeed = 5
MaxJumpHeight = 50
chunk_qtn = 10
mark_block = 0
transparency_block = [0, 4, 9]
clock = pygame.time.Clock()

pass_ = save_zone + "inv.txt"
txt_chat = "Chat : T"

chk = []

player_hand = None
fly = False
move = True
onWrite = False
collison = True
jump = True

counter = 0
LEFT = 1
RIGHT = 3

running = True

inv_frame = pygame.image.load("texture/inv_frame.png")
sky = pygame.image.load("texture/sky.png")
life_bar = pygame.image.load("texture/life_bar.png")

pygame.init()
pygame.display.init()
screen = pygame.display.set_mode((withScreen, withScreen))

pygame.display.set_caption('Show Text')
font = pygame.font.Font('freesansbold.ttf', 32)
text = font.render("x : " + str(player.x) + " y :" + str(player.y), True, "white", "black")
textRect = text.get_rect()
font = pygame.font.Font(None, 24)

def load_map_view(chunk, block_list):
    global screen
    x = 0 + player.x
    y = 0 + player.y
    for b in range(chunk_qtn):
        for k in range(chunkYLenght):
            for i in range(chunkXLenght):
                x_test = x + (cubeSize * 10) * b + i * cubeSize
                y_test = y + k * cubeSize - 1150
                if (-cubeSize < x_test < withScreen) and (-cubeSize < y_test < withScreen):
                    for id in block_list:
                        if id.id == chunk[b][k][i]:
                            screen.blit(block_list_t[id.id], (x_test, y_test))

def get_block_coordinate(x, x1, y, y1):
    block = 0
    try:
        for k in range(chunk_qtn):
            if 250 * k <= x[0] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[0] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[1] - y1)) // 25 + 1150 / 25
                block = chunk[int(block_y)][int(block_x)]
    except:
        block = 0
    return block

def get_block_head_coordinate(x, x1, y, y1):
    try:
        for k in range(chunk_qtn):
            if 250 * k <= x - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x - x1) - 250 * (k + 1)) // 25
                block_y = ((y - y1)) // 25 + 1150 / 25
                block = chunk[int(block_y) - 3][int(block_x)]
    except:
        block = 0
    return block

def get_block_coordinate_1(x, x1, y, y1):
    block = 0
    block_2 = 0
    block_3 = 0
    block_v = False
    try:
        for k in range(chunk_qtn):
            if 250 * k <= x[0] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[0] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[0] - y1)) // 25 + 1150 / 25
                block = chunk[int(block_y)][int(block_x)]
        for k in range(chunk_qtn):
            if 250 * k <= x[0] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[0] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[1] - y1)) // 25 + 1150 / 25
                block_2 = chunk[int(block_y)][int(block_x)]
        for k in range(chunk_qtn):
            if 250 * k <= x[0] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[0] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[2] - y1)) // 25 + 1150 / 25
                block_3 = chunk[int(block_y)][int(block_x)]
    except:
        block = 0
        block_2 = 0
        block_3 = 0
        block_v = False
    if block not in transparency_block or block_2 not in transparency_block or block_3 not in transparency_block:
        block_v = True
    return block_v

def get_block_coordinate_2(x, x1, y, y1):
    block = 0
    block_2 = 0
    block_3 = 0
    block_v = False
    try:
        for k in range(chunk_qtn):
            if 250 * k <= x[1] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[1] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[0] - y1)) // 25 + 1150 / 25
                block = chunk[int(block_y)][int(block_x)]
        for k in range(chunk_qtn):
            if 250 * k <= x[1] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[1] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[1] - y1)) // 25 + 1150 / 25
                block_2 = chunk[int(block_y)][int(block_x)]
        for k in range(chunk_qtn):
            if 250 * k <= x[1] - x1 <= 250 * (k + 1):
                chunk = chk[k]
                block_x = ((x[1] - x1) - 250 * (k + 1)) // 25
                block_y = ((y[2] - y1)) // 25 + 1150 / 25
                block_3 = chunk[int(block_y)][int(block_x)]
    except:
        block = 0
        block_2 = 0
        block_3 = 0
        block_v = False
    if block not in transparency_block or block_2 not in transparency_block or block_3 not in transparency_block:
        block_v = True
    return block_v

def breaking_block():
    block = 0
    try:
        poss = pygame.mouse.get_pos()
        x1 = poss[0]
        y1 = poss[1]
        for k in range(chunk_qtn):
            if (cubeSize * 10) * k <= (playerMiddleX - player.x) - (playerMiddleX - x1) <= (cubeSize * 10) * (k + 1):
                chunk = chk[k]
                block_x = ((x1 - player.x) - (cubeSize * 10) * (k + 1)) // cubeSize
                block_y = ((y1 - player.y)) // cubeSize + 1150 // cubeSize
                block = chunk[int(block_y)][int(block_x)]
                chunk[int(block_y)][int(block_x)] = 0
    except:
        block = 0
    return block

def getting_mouse_block():
    block = 0
    try:
        poss = pygame.mouse.get_pos()
        x1 = poss[0]
        y1 = poss[1]
        for k in range(chunk_qtn):
            if (cubeSize * 10) * k <= (playerMiddleX - player.x) - (playerMiddleX - x1) <= (cubeSize * 10) * (k + 1):
                chunk = chk[k]
                block_x = ((x1 - player.x) - (cubeSize * 10) * (k + 1)) // cubeSize
                block_y = ((y1 - player.y)) // cubeSize + 1150 // cubeSize
                block = chunk[int(block_y)][int(block_x)]
    except:
        block = 0
    return block

def placing_block():
    global chunk
    if player_hand != 0:
        try:
            poss = pygame.mouse.get_pos()
            x1 = poss[0]
            y1 = poss[1]
            for k in range(chunk_qtn):
                if cubeSize * 10 * k <=

            for k in range(chunk_qtn):
                if (cubeSize * 10) * k <= (playerMiddleX - player.x) - (playerMiddleX - x1) <= (cubeSize * 10) * (k + 1):
                    chunk = chk[k]
                    block_x = ((x1 - player.x) - (cubeSize * 10) * (k + 1)) // cubeSize
                    block_y = ((y1 - player.y)) // cubeSize + 1150 // cubeSize
                    if chunk[int(block_y)][int(block_x)] == 0:
                        chunk[int(block_y)][int(block_x)] = player_hand

def main():
    global screen, running, player
    # Load initial map
    chk.extend(load_map(chunk_qtn, chunkYLenght, chunkXLenght, 0)) # Make sure load_map is defined properly

    while running:
        screen.fill((0, 0, 0))  # Clear screen with black
        screen.blit(sky, (0, 0))  # Draw sky background

        load_map_view(chk, block_list)  # Draw the map

        # Player display
        player_rect = pygame.Rect(playerMiddleX, withScreen // 2, 25, 50)
        pygame.draw.rect(screen, (255, 0, 0), player_rect)

        # Life bar
        screen.blit(life_bar, (10, 10))

        # Inventory frame
        screen.blit(inv_frame, (10, withScreen - 60))

        for event in pygame.event.get():
            if event.type == QUIT:
                running = False
            elif event.type == KEYDOWN:
                if event.key == K_ESCAPE:
                    running = False
                elif event.key == K_t:
                    onWrite = True
                elif event.key == K_f:
                    fly = not fly
                elif event.key == K_e:
                    collison = not collison
            elif event.type == MOUSEBUTTONDOWN:
                if event.button == LEFT:
                    breaking_block()
                elif event.button == RIGHT:
                    placing_block()

        keys = pygame.key.get_pressed()
        if keys[K_a]:
            player.x -= playerSpeed
        if keys[K_d]:
            player.x += playerSpeed
        if keys[K_w] and (fly or collison):
            player.y -= playerSpeed
        if keys[K_s] and (fly or collison):
            player.y += playerSpeed

        # Update the player's position text
        text = font.render("x : " + str(player.x) + " y :" + str(player.y), True, "white", "black")
        screen.blit(text, textRect)

        pygame.display.update()
        clock.tick(30)  # Limit frame rate to 30 FPS

if __name__ == "__main__":
    main()
    pygame.quit()
