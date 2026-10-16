# Day 12 — DTOs, Validation & Error Handling

## Overview
This module demonstrates enterprise input validation, mass assignment protection, and global exception handling in **NestJS**:
- **Data Transfer Objects (DTOs)** with `class-validator` and `class-transformer`
- **Mass Assignment Protection**: `whitelist: true`, `forbidNonWhitelisted: true`
- **Nested Object Validation**: `@ValidateNested()` with `@Type(() => ChildDto)`
- **Consistent Error Responses**: Global `AllExceptionsFilter` producing standard `{ statusCode, message, error, timestamp, path }` JSON responses.

---

## Project Structure
```
day12/
├── src/
│   ├── common/
│   │   ├── exceptions/app.exception.ts       # Custom AppException & ProjectNotFoundException
│   │   └── filters/http-exception.filter.ts  # Global AllExceptionsFilter (5-field schema)
│   ├── projects/
│   │   ├── dto/
│   │   │   ├── create-project.dto.ts         # @IsString, @MinLength, @IsEnum, @IsInt
│   │   │   ├── update-project.dto.ts         # @IsOptional validated updates
│   │   │   └── project-response.dto.ts       # Structured API response model
│   │   ├── projects.controller.ts            # Route handlers with DTO parameters
│   │   ├── projects.service.ts               # In-memory business logic with AppException
│   │   └── projects.module.ts
│   ├── towers/
│   │   ├── dto/
│   │   │   ├── floor.dto.ts                  # Floor validation: @IsInt, @IsEnum
│   │   │   └── tower.dto.ts                  # Nested validation: @ValidateNested()
│   │   ├── towers.controller.ts              # /projects/:projectId/towers
│   │   ├── towers.service.ts
│   │   └── towers.module.ts
│   ├── app.module.ts
│   └── main.ts                               # Port 3012, ValidationPipe & AllExceptionsFilter
├── postman_collection.json                   # 8 API test requests (valid & invalid rejections)
├── test-day12.cjs                            # Automated test runner (8/8 clean assertions)
├── study_material.txt                        # Comprehensive study notes
└── study_material.pdf                        # Professional PDF guide
```

---

## Running the API & Automated Tests

```bash
# 1. Compile TypeScript
npm run build

# 2. Start the API server on Port 3012
npm run start

# 3. Run automated tests (8/8 assertions)
npm run test
```

---

## Validation Rules & Endpoints

| Field / Target | Decorator Rules | Failure Response |
|---|---|---|
| `name` | `@IsString()`, `@MinLength(3)`, `@MaxLength(100)` | 400 Bad Request with message |
| `description` | `@IsOptional()`, `@MaxLength(500)` | 400 Bad Request if > 500 chars |
| `status` | `@IsEnum(ProjectStatus)` | 400 with allowed enum list |
| `towerCount` | `@IsInt()`, `@Min(1)`, `@Max(50)` | 400 if out of range |
| Unrecognized fields | `forbidNonWhitelisted: true` | 400 property should not exist |
| Nested floors | `@ValidateNested()`, `@Type(() => FloorDto)` | 400 on invalid nested child fields |
| Missing project | `ProjectNotFoundException` | 404 with standard 5-field schema |

---

## Testing Day 12 APIs with Hoppscotch

* **API Base URL**: `http://localhost:3012`
* **Focus**: Input validation rejection (`400 Bad Request`) & Mass assignment stripping

### Key Hoppscotch Validation Tests:
1. **Valid Project Creation**:
   * `POST http://localhost:3012/projects`
   * Body: `{"name": "SitePulse Tower Block", "status": "PLANNING", "towerCount": 4}`
   * Returns: `201 Created`
2. **Invalid Input (Name too short)**:
   * `POST http://localhost:3012/projects`
   * Body: `{"name": "X", "status": "PLANNING", "towerCount": 4}`
   * Returns: `400 Bad Request` with `"name must be longer than or equal to 3 characters"`
3. **Mass Assignment Attack (Unwhitelisted field)**:
   * `POST http://localhost:3012/projects`
   * Body: `{"name": "Valid Name", "status": "PLANNING", "towerCount": 4, "isAdmin": true}`
   * Returns: `400 Bad Request` with `"property isAdmin should not exist"`

