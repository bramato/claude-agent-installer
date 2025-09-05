# 📋 Project Context Management System

**IMPORTANT: Before using any agent, you must initialize the project context management system.**

## 🚀 Context Initialization (MANDATORY)

### 1. **Create Base Structure**

Create the following directory structure in the project root:

```bash
mkdir -p .mcp/doc/{project,frameworks,apis,knowledge,templates}
```

### 2. **Main Context File**

Create the `.mcp/doc/context_main.md` file with the following structure:

```markdown
# 🎯 Main Project Context

**Last update date:** [INSERT_DATE]
**Context version:** 1.0

## 📋 Context Index

### 🏗️ Project
- [Project Structure](./project/structure.md)
- [Configurations](./project/config.md)
- [Dependencies](./project/dependencies.md)

### 🔧 Frameworks and Technologies
- [Main Frameworks](./frameworks/main.md)
- [Used Libraries](./frameworks/libraries.md)
- [Versions and Compatibility](./frameworks/versions.md)

### 🌐 APIs and Services
- [Internal APIs](./apis/internal.md)
- [External Services](./apis/external.md)
- [API Documentation](./apis/documentation.md)

### 📚 Knowledge Base
- [Code Conventions](./knowledge/conventions.md)
- [Architectural Patterns](./knowledge/patterns.md)
- [Best Practices](./knowledge/best_practices.md)

## 🎯 Instructions for Agents

**FUNDAMENTAL RULE:** All agents must:

1. **Always read the context** before starting any task
2. **Consult specific files** for their domain of expertise
3. **Update the context** when necessary
4. **Maintain consistency** with existing conventions

## 🔄 Context Updates

To update or extend the context, use the **installer.workflow.context-manager** agent which can:
- Analyze updated web documentation
- Create new atomic context files
- Integrate new technologies into existing context
- Maintain coherence across all context files
```

### 3. **Base File Templates**

Create the following base templates:

#### `.mcp/doc/project/structure.md`
```markdown
# 📁 Project Structure

[PROJECT ARCHITECTURE DESCRIPTION]

## Main Directories
- `/src/` - Main source code
- `/tests/` - Test suite
- `/docs/` - Documentation
- `/config/` - Configuration files

## Architectural Pattern
[INSERT USED PATTERN]

## Specific Notes
[INSERT PROJECT SPECIFIC NOTES]
```

#### `.mcp/doc/frameworks/main.md`
```markdown
# 🔧 Main Frameworks

## Primary Framework
**Name:** [INSERT_FRAMEWORK]
**Version:** [INSERT_VERSION]
**Documentation:** [INSERT_LINK]

## Specific Configurations
[INSERT CONFIGURATIONS]

## Framework Conventions
[INSERT CONVENTIONS]
```

#### `.mcp/doc/knowledge/conventions.md`
```markdown
# 📝 Code Conventions

## Coding Style
[INSERT STYLE]

## Naming Conventions
[INSERT NAMING CONVENTIONS]

## File Structure
[INSERT STRUCTURE CONVENTIONS]

## Used Patterns
[INSERT PATTERNS]
```

## ⚡ Recommended Workflow

### For Each Development Session:

1. **Initialize context** (if not done)
2. **Consult context_main.md** for overview
3. **Read specific files** for the task
4. **Use specialized agents** with context
5. **Update context** if necessary

### For New Technologies/Frameworks:

1. **Invoke installer.workflow.context-manager**
2. **Specify technology to integrate**
3. **Agent will create specific context files**
4. **Automatic context_main.md update**

## 🎯 System Benefits

✅ **Consistency:** All agents work with the same information
✅ **Scalability:** Easy to add new contexts
✅ **Maintainability:** Atomically organized information
✅ **Efficiency:** More precise agents with specific context
✅ **Collaboration:** Team aligned on conventions

## 📋 Initialization Checklist

- [ ] Created `.mcp/doc/` directory structure
- [ ] Created `context_main.md` file
- [ ] Created base templates in subdirectories
- [ ] Populated files with project-specific information
- [ ] Tested agent access with new system

---

**⚠️ IMPORTANT:** This system must be initialized BEFORE using any agent to ensure optimal and consistent results.