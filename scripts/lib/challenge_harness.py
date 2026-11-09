# Appended after the learner's code to grade a challenge. __TESTS is a list of
# [call, expected] Python expressions; one JSON line with every result is printed.
import json as __json
__results = []
for __call, __exp in __TESTS:
    try:
        __got = eval(__call)
        __want = eval(__exp)
        __results.append({"call": __call, "got": repr(__got), "want": repr(__want), "ok": __got == __want})
    except Exception as __e:
        __results.append({"call": __call, "got": type(__e).__name__ + ": " + str(__e), "want": __exp, "ok": False})
print("__ATLAS_RESULTS__" + __json.dumps(__results))
