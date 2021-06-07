import os
import signal
import subprocess
from kazoo.client import KazooClient

import keyboard as kb

offsprings = set()
process = None
client = KazooClient(hosts='127.0.0.1:2181')
client.start()

if client.exists("/z"):
    print("[INFO]: Deleting /z ...")
    client.delete("/z", recursive=True)


def print_all():
    global offsprings
    output = [i for i in offsprings]
    output.sort()
    for item in output:
        print(f"[ITEM]: {item}")


kb.add_hotkey('ctrl+l+s', print_all)


def add_and_print(path):
    global offsprings
    if path not in offsprings:
        offsprings.add(path)
        print(f"[INFO]: No. of offsprings: {len(offsprings)}")


def remove_and_print(path):
    global offsprings
    if path in offsprings:
        offsprings.remove(path)
        print(f"[INFO]: No. of offsprings: {len(offsprings)}")


def watch(event):
    global offsprings
    global process
    global client
    if event.type == 'CREATED':
        client.exists(event.path, watch=watch)
        client.get_children(event.path, watch=watch)
        if event.path not in offsprings:
            process = subprocess.Popen(["notepad.exe", ""])
            add_and_print(event.path)
    elif event.type == 'CHILD':
        if client.exists(event.path, watch=watch):
            children = client.get_children(event.path, watch=watch)
            for child in children:
                child_path = f"{event.path}/{child}"
                client.exists(child_path, watch=watch)
                client.get_children(child_path, watch=watch)
                add_and_print(child_path)
    elif event.type == 'DELETED':
        client.exists(event.path, watch=watch)
        if event.path == "/z":
            os.kill(process.pid, signal.SIGTERM)
        remove_and_print(event.path)


client.exists("/z", watch=watch)

try:
    while True:
        pass
except KeyboardInterrupt:
    client.stop()
    exit()
