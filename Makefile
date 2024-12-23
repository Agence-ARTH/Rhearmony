.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	npm install;

admin-start: ## start admin app
	npm run dev --workspace=admin

application-start: ## start application app
	npm run dev --workspace=application
	
supabase-start: ## start supabase locally
	npx supabase start

supabase-stop: ## stop local supabase
	npx supabase stop

supabase-reset: ## reset local supabase
	npx supabase stop --no-backup

supabase-remote-init: ## init remote supabase
	npm run supabase:remote:init
	$(MAKE) supabase-deploy

supabase-deploy: ## deploy supabase
	npx supabase db push
	npx supabase functions deploy

build: ## build the app
	npm run build

typecheck: ## typecheck the app
	npm run typecheck --workspace=admin

lint-check: ## lint the app
	npm run lint:check