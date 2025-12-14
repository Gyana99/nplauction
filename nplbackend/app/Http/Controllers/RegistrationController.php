<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Str;
use Exception;
use Carbon\Carbon;

class RegistrationController extends Controller
{
    public function registration(Request $request)
    {
        //return Carbon::now()->toDateTimeString();
        // 1. Basic validation (you can expand this)
        $name = $request->input('name');
        $mobile = $request->input('mobile_no');
        $age = $request->input('age');
        $playerType = $request->input('type_of_player');
        $photoData = $request->input('photo'); // expect data:image/jpeg;base64,/9j...

        if (!$name || !$mobile || !$age) {
            return response()->json(['status' => 'error', 'message' => 'Missing required fields'], 422);
        }

        // 2. If no photo provided, insert DB row with null or default path
        if (!$photoData) {
            $insertId = DB::table('player_registration')->insertGetId([
                'name' => $name,
                'mobile_no' => $mobile,
                'age' => $age,
                'type_of_player' => $playerType,
                'photo' => null,
                'created_at' => Carbon::now()->toDateTimeString(),
                //'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            $row = DB::table('player_registration')->where('id', $insertId)->first();
            return response()->json(['status' => 'ok', 'data' => $row], 201);
        }

        try {
            // 3. Parse data URI: data:[<mime>][;base64],<data>
            if (!preg_match('/^data:(image\/[a-zA-Z]+);base64,(.*)$/', $photoData, $matches)) {
                return response()->json(['status' => 'error', 'message' => 'Invalid image data format'], 422);
            }

            $mime = $matches[1];            // e.g. image/jpeg
            $base64 = $matches[2];          // base64 string (without data:prefix)

            // 4. Map mime to extension (allow jpg, jpeg, png)
            $map = [
                'image/jpeg' => 'jpg',
                'image/jpg'  => 'jpg',
                'image/png'  => 'png'
            ];
            if (!isset($map[$mime])) {
                return response()->json(['status' => 'error', 'message' => 'Only JPG and PNG images allowed'], 422);
            }
            $ext = $map[$mime];

            // 5. Optional: check size (in bytes). base64 length -> bytes roughly = (len * 3)/4
            $decodedLength = (int) (strlen($base64) * 3 / 4);
            $maxBytes = 5 * 1024 * 1024; // 5 MB
            if ($decodedLength > $maxBytes) {
                return response()->json(['status' => 'error', 'message' => 'Image exceeds 5MB limit'], 422);
            }

            // 6. Decode base64 safely
            $imageData = base64_decode($base64);
            if ($imageData === false) {
                return response()->json(['status' => 'error', 'message' => 'Base64 decode failed'], 422);
            }

            // 7. Prepare destination directory (public/storage/uploads/playerimage)
            //    You can change this to storage_path('app/public/player_images') as needed.
            $destinationDir = storage_path('uploads/playerimage');

            if (!is_dir($destinationDir)) {
                // create with recursive permissions
                mkdir($destinationDir, 0755, true);
            }

            // 8. Generate a unique filename
            $filename = time() . '_' . Str::random(8) . '.' . $ext;
            $filePath = $destinationDir . DIRECTORY_SEPARATOR . $filename;

            // 9. Save file
            file_put_contents($filePath, $imageData);

            // 10. Build the stored path you want to save to DB
            // For example: "storage/uploads/playerimage/yourfile.jpg"
            $dbPath =  $filename;

            // 11. Insert into DB (adjust column names to match your table)
            $insertId = DB::table('player_registration')->insertGetId([
                'name'  => $name,
                'mobile_no' => $mobile,
                'age'   => $age,
                'type_of_player'  => $playerType,
                'photo' => $dbPath,
                'created_at' => Carbon::now()->toDateTimeString(),
                //'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            $row = DB::table('player_registration')->where('id', $insertId)->first();

            return response()->json(['status' => '200']);
        } catch (Exception $e) {
            // log error if you have logger
            // Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Server error', 'detail' => $e->getMessage()], 500);
        }
    }
    public function allPlayer()
    {
        try {
            // Fetch all players
            $players = DB::table('player_registration')->orderBy('created_at', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

            return response()->json([
                'status'  => true,
                'message' => 'Players fetched successfully',
                'data'    => $players
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong while fetching players.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
    public function accept(Request $request)
    {
        $id = $request->id;

        try {
            DB::beginTransaction();

            $update = DB::table('player_registration')
                ->where('id', $id)
                ->update(['status' => 1]);

            if (!$update) {
                DB::rollBack();
                return response()->json([
                    'status'  => false,
                    'message' => 'Player not found or update failed.'
                ], 404);
            }

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Player status updated successfully!'
            ], 200);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
