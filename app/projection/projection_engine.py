import json


class ProjectionEngine:

    @staticmethod
    def project(profile, config_path):

        with open(config_path) as f:
            config = json.load(f)

        profile = profile.model_dump()

        output = {}

        for field in config["fields"]:

            output_name = field["path"]

            source = field.get("from", output_name)

            value = ProjectionEngine.extract(
                profile,
                source,
            )

            output[output_name] = value

        if config.get("include_confidence", True):
            output["overall_confidence"] = profile["overall_confidence"]

        if config.get("include_provenance", True):
            output["provenance"] = profile["provenance"]

        return output

    @staticmethod
    def extract(data, path):

        if path.endswith("[]"):
            return data.get(path[:-2], [])

        if path.endswith("[].name"):

            key = path.replace("[].name", "")

            return [
                x["name"]
                for x in data.get(key, [])
            ]

        if "[0]" in path:

            key = path.replace("[0]", "")

            values = data.get(key, [])

            if values:
                return values[0]

            return None

        return data.get(path)