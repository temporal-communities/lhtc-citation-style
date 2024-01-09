timestamp := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")

style:
	@# Replace {{TIMESTAMP}} with current time in ISO
	@sed 's/{{TIMESTAMP}}/$(timestamp)/' src/lhtc.csl > dist/lhtc.csl
	@echo "Built dist/lhtc.csl."
