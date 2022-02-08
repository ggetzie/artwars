import json


def immutify():
    artworks = json.loads(open("artworks.json").read())
    res = [
        {
            "id": aw["id"],
            "title": aw["title"],
            "artist": aw["artist"],
            "category": aw["category"],
            "year": aw["year"],
            "minValue": int(aw["value"] * 0.1),
            "maxValue": int(aw["value"] * 10),
            "startingValue": aw["value"],
            "imageUrl": aw["urls"][0],
            "special": "tbd",
        }
        for aw in artworks
    ]
    with open("artworks.json", "w") as outfile:
        outfile.write(json.dumps(res))
