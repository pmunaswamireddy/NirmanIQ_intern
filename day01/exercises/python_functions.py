# Day 1: Original Python Functions
# Author: Penumuru Madhu Sudhan Reddy

# 1. Fibonacci
def fibonacci(n):
  if n<=0: return []
  if n==1: return [0]
  res=[0,1]
  for i in range(2,n):
    res.append(res[i-1]+res[i-2])
  return res

# 2. Palindrome check
def is_palindrome(s):
  clean=""
  for ch in str(s).lower():
    if ch.isalnum():
      clean+=ch
  return clean==clean[::-1]

# 3. Array rotation
def rotate_array(arr,k):
  if not arr: return []
  k=k%len(arr)
  return arr[-k:]+arr[:-k] if k!=0 else arr

# 4. Group by
def group_by(arr,key):
  res={}
  for item in arr:
    val=item.get(key,'unknown')
    if val not in res:
      res[val]=[]
    res[val].append(item)
  return res

# 5. Flatten nested array
def flatten_array(arr):
  res=[]
  for item in arr:
    if isinstance(item,list):
      res.extend(flatten_array(item))
    else:
      res.append(item)
  return res

if __name__=="__main__":
  print("Fibonacci (5):",fibonacci(5))
  print("Palindrome racecar:",is_palindrome("racecar"))
  print("Rotate [1,2,3,4,5] by 2:",rotate_array([1,2,3,4,5],2))
  tasks=[{"task":"Excavation","tower":"A"},{"task":"Piling","tower":"A"},{"task":"Slab","tower":"B"}]
  print("Group by tower:",group_by(tasks,"tower"))
  print("Flatten [1,[2,3],[[4],5]]:",flatten_array([1,[2,3],[[4],5]]))
