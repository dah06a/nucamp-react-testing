module.exports = {
    "extends": ["react-app"],
    "rules": {
    },
    "overrides": [
        {
            "files": ["**/*js?(x)"],
            "rules": {
                "react/jsx-pascal-case": "off"
            }
        }
    ]
}
